// Note: Sut means System Under Test,
// which saves us from having to give it a unique name each time
import { add, addThree } from '../src/simple';

// First check the happy path - the normal inputs expected to get an output

describe('the AddThree function', () => {

  test('Adding 0, 0 and 0 should equal 0', () => {
    expect(addThree(0, 0, 0)).toEqual(0);
  });

  test('Adding 0, 1 and 2 should equal 3', () => {
    expect(addThree(0, 1, 2)).toEqual(3);
  });

  test('Adding 1, 1 and 1 should equal 3', () => {
    expect(addThree(1, 1, 1)).toEqual(3);
  });

  test('Adding 1000, 1000 and 1000 should equal 3000', () => {
    expect(addThree(1000, 1000, 1000)).toEqual(3000);
  });

  // Now check the sad path - both extreme and strange inputs and what output they should give

  test('Adding 100000000000000000, 100000000000000000 and 100000000000000000 should equal 300000000000000000', () => {
    expect(addThree(100000000000000000, 100000000000000000, 100000000000000000)).toEqual(300000000000000000);
  });

  test('Adding false, false and false should equal false', () => {
    expect(addThree(false, false, false)).toEqual(false);
  });

  test('Adding null, null and null should equal false', () => {
    expect(addThree(null, null, null)).toEqual(false);
  });

  test('Adding undefined, undefined and undefined should equal false', () => {
    expect(addThree(undefined, undefined, undefined)).toEqual(false);
  });

  test('Adding NaN, and NaN should equal false', () => {
    expect(addThree(NaN, NaN, NaN)).toEqual(false);
  });

})