import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breakdown } from './breakdown.entity';
import { createBearkdownDto } from './dto/create-breakdown.dto';
import { Auth } from 'src/auth/auth.entity';

interface Analysis {
  category: string;
  amount: number;
  color?: string;
}

@Injectable()
export class BreakdownService {
  constructor(
    @InjectRepository(Breakdown)
    private breakdownRepository: Repository<Breakdown>,
  ) {}

  async create(createBearkdownDto: createBearkdownDto, auth: Auth) {
    try {
      const { amount, type, category, date, memo } = createBearkdownDto;
      const user = this.breakdownRepository.create({
        amount,
        type,
        category,
        date,
        memo,
        auth,
      });
      await this.breakdownRepository.save(user);
      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  async getAllBreakdown(
    auth: Auth,
    date: string,
    type: 'all' | 'income' | 'spending',
    search: string,
  ) {
    try {
      // 중복을 제거한 날짜 추출
      const currentDateList = await this.breakdownRepository.query(
        `select distinct date_format(date, '%Y-%m-%d') as currentDateList from breakdown where authId=${auth.id} and date like '%${date}%'${type !== 'all' ? ` and type='${type}'` : ''}${search && ` and (category like '%${search}%' or memo like '%${search}%')`} order by currentDateList desc`,
      );

      const breakdown = {};
      // 해당 month의 각 day에 접근하기 위해 반복문 실행
      for (const key in currentDateList) {
        const { currentDateList: currentDate } = currentDateList[key];
        breakdown[`${currentDate}`] = {};

        // 부합하는 day의 가계부 내역 추출
        const data = await this.breakdownRepository.query(
          `select * from breakdown where authId=${auth.id} and date like '%${currentDate}%'${type !== 'all' ? ` and type='${type}'` : ''}${search && ` and (category like '%${search}%' or memo like '%${search}%')`} order by date desc`,
        );
        breakdown[`${currentDate}`]['data'] = data;

        // 부합하는 day의 수입 내역 추출
        if (type !== 'spending') {
          const [{ 'sum(amount)': dayIncome }] =
            await this.breakdownRepository.query(
              `select sum(amount) from breakdown where authId=${auth.id} and type='income' and date like '%${currentDate}%'${search && ` and (category like '%${search}%' or memo like '%${search}%')`}`,
            );
          breakdown[`${currentDate}`]['income'] = Number(dayIncome);
        }

        // 부합하는 day의 지출 내역 추출
        if (type !== 'income') {
          const [{ 'sum(amount)': daySpending }] =
            await this.breakdownRepository.query(
              `select sum(amount) from breakdown where authId=${auth.id} and type='spending' and date like '%${currentDate}%'${search && ` and (category like '%${search}%' or memo like '%${search}%')`}`,
            );
          breakdown[`${currentDate}`]['spending'] = Number(daySpending);
        }
      }

      // 해당 month의 총 수입 추출
      const [{ 'sum(amount)': income }] = await this.breakdownRepository.query(
        `select sum(amount) from breakdown where authId=${auth.id} and type='income' and date like '%${date}%'`,
      );
      // 해당 month의 총 지출 추출
      const [{ 'sum(amount)': spending }] =
        await this.breakdownRepository.query(
          `select sum(amount) from breakdown where authId=${auth.id} and type='spending' and date like '%${date}%'`,
        );
      return {
        ok: true,
        breakdown,
        income: Number(income),
        spending: Number(spending),
      };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  async analysis(auth: Auth, date: string, type: string) {
    try {
      // 랜덤 색상 추출
      const getRandomColor = (): string => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgba(${red}, ${green}, ${blue}, 0.5)`;
      };

      // 데이터의 길이만큼 랜덤 색상 추출
      const getRandomColorsForArrayLength = (
        length: number,
        breakdown?: Analysis[],
      ): string[] => {
        const colors: string[] = [];
        for (let i = 0; i < length; i++) {
          const color = getRandomColor();
          colors.push(color);
          breakdown[i].color = color;
        }
        return colors;
      };

      const dataExtraction = async (type: string, label: string) => {
        // 중복 제거한 카테고리 추출
        const breakdown: Analysis[] = await this.breakdownRepository.query(
          `select distinct(category) from breakdown where authId=${auth.id} and date like '%${date}%' and type='${type}'`,
        );
        // 카테고리에 해당하는 수입, 지출 내역 추출
        for (const obj of breakdown) {
          const [{ amount }] = await this.breakdownRepository.query(
            `select sum(amount) as amount from breakdown where authId=${auth.id} and date like '%${date}%' and type='${type}' and category='${obj.category}'`,
          );
          obj.amount = amount;
        }
        breakdown.sort((a, b) => b.amount - a.amount);
        const labels = breakdown.map((item) => item.category);
        const amount = breakdown.map((item) => item.amount);
        const chartData = {
          labels,
          datasets: [
            {
              label,
              data: amount,
              backgroundColor: getRandomColorsForArrayLength(
                labels.length,
                breakdown,
              ),
            },
          ],
        };
        return { chartData, breakdown };
      };

      if (type === 'income') {
        return dataExtraction(type, '수입');
      } else if (type === 'spending') {
        return dataExtraction(type, '지출');
      }
    } catch (error) {}
  }
}
