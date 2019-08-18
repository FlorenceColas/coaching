import { DateTools } from './date-tools.classes';

describe('DateTools', () => {
  it('should return the previous week in the same year', () => {
    const ret = DateTools.getPreviousWeek('35', '2019');
    const expected = { week: '34', year: '2019' };
    expect(ret).toEqual(expected);
  });

  it('should return the last week of the previous year (52 weeks)', () => {
    const ret = DateTools.getPreviousWeek('1', '2019');
    const expected = { week: '52', year: '2018' };
    expect(ret).toEqual(expected);
  });

  it('should return the last week of the previous year (53 weeks)', () => {
    const ret = DateTools.getPreviousWeek('1', '2016');
    const expected = { week: '53', year: '2015' };
    expect(ret).toEqual(expected);
  });

  it('should return the next week in the same year', () => {
    const ret = DateTools.getNextWeek('35', '2019');
    const expected = { week: '36', year: '2019' };
    expect(ret).toEqual(expected);
  });

  it('should return the first week in the next year', () => {
    const ret = DateTools.getNextWeek('52', '2019');
    const expected = { week: '1', year: '2020' };
    expect(ret).toEqual(expected);
  });
});
