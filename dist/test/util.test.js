import should from 'should';
import { getOrientation } from '../utils/ui-utils';
import { json2query } from '../utils/util';

describe('测试设备方向', () => {
  it('高大于宽，应该是竖向', () => {
    should(getOrientation(750, 1334)).be.eql('portrait');
  });

  it('宽大于高，应该是横向', () => {
    should(getOrientation(1334, 750)).be.eql('landscape');
  });
});

describe('json转queryString测试', () => {
  it('输入json，应该得到查询字符串', () => {
    const input = {
      userId: 818,
      userName: 'xiaoming'
    };
    const result = json2query(input);
    let encode = encodeURIComponent(input.userName);

    should(result).be.eql('userId=818&userName=' + encode);
  });

  it('输入{}，应该得到""', () => {
    const input = {};
    const result = json2query(input);

    should(result).be.eql('');
  });
});