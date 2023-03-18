import {calculateTimeDifference} from './calculetime'; 

describe('calculateTimeDifference', ()=>{
    it("should return the correct time difference string if the input date is in the future", ()=>{
      const result = calculateTimeDifference("2023-03-23T14:33:00.000Z"); 
      expect(result).toBe("This order starts in 4 days 21 hours");
    });
    
    it("should return 'This order is starting late.' if the input date is in the past", ()=>{
      const result = calculateTimeDifference("2020-03-23T14:33:00.000Z"); 
      expect(result).toBe("This order is starting late.");
    });
  });
  