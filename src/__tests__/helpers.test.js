import { toReadableTime } from "../helpers";

test('toReadableTime', () => {
    expect(toReadableTime(59)).toEqual('0:59');
    expect(toReadableTime(60)).toEqual('1:00');
    expect(toReadableTime(599)).toEqual('9:59');
    expect(toReadableTime(600)).toEqual('10:00');
    expect(toReadableTime(3599)).toEqual('59:59');
    expect(toReadableTime(3600)).toEqual('1:00:00');
    expect(toReadableTime(86399)).toEqual('23:59:59');
    expect(toReadableTime(86400)).toEqual('24:00:00');
});
