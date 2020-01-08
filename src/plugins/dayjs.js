import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

dayjs.extend((option, dayjsClass) => {
  dayjsClass.prototype.addDay = function(day) {
    return this.add(day, 'day').subtract(1, 'second');
  };
});

export default dayjs;
