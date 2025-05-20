import { Injectable } from '@nestjs/common';
import { EthersService } from '../../ethers/ethers.service';
import { exceptions } from '../../../common/exceptions/exception.config';

@Injectable()
export class BankService {
  constructor(private readonly ethersService: EthersService) { }

  async getOwner() {
    try {
      // Todo: owner의 값을 리턴합니다.
      return await this.ethersService.owner();
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async getBalance() {
    try {
      // Todo: SentValue값을 리턴합니다.
      return await this.ethersService.sentValue();
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
    }
  }

  async getTimestamp() {
    try {
      // Todo: getTimestamp의값을 리턴합니다.
      // bigint여서 toString() 해야 함 
      return await this.ethersService.timestamp().toString();
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async getGas() {
    try {
      // Todo: gasUsed의 값을 리턴합니다.
      // ⚠️ bigint 타입은 JSON으로 변환 시 string으로 변환 필요
      const gasUsed = await this.ethersService.gasUsed();
      // console.log('gas', gasUsed);
      return await gasUsed.toString();
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async deposit(value: number) {
    try {
      // Todo: deposit의 값을 리턴합니다.
      return await this.ethersService.deposit(value);
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async getCaller() {
    try {
      // Todo: getCaller의 값을 리턴합니다.
      return await this.ethersService.getCaller();
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async getOrigin() {
    try {
      // Todo: getOrigin의값을 리턴합니다.
      return await this.ethersService.getOrigin();
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async getBlockDetails() {
    try {
      /*
        Todo: getBlockDetails의 값을 리턴합니다.
        리턴 예시 -> {
          "blockNumber": (string),
          "blockPrevrandao": (string),
          "blockGasLimit": (string),
          "blockCoinBase": (string)
        }
        ⚠️ bigint 타입은 JSON으로 변환 시 string으로 변환 필요
      */

      const details = await this.ethersService.getBlockDetails();
      // console.log('details', details);
      // (나) 각 요소 구조 분해할당 
      const [blockNumber, blockPrevrandao, blockGasLimit, blockCoinBase] = details;

      return {
        blockNumber: blockNumber.toString(),
        blockPrevrandao: blockPrevrandao.toString(),
        blockGasLimit: blockGasLimit.toString(),
        blockCoinBase: blockCoinBase.toString(),
      };
      // <아래는 처음 시도했던 방법> 
      // return details.map((detail) => {
      //   if (typeof detail === 'bigint') {
      //     return detail.toString();
      //   } else {
      //     return detail;
      //   }
      // })
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async getGasTrack() {
    try {
      // Todo: trackGasUsage의 값을 리턴합니다.
      return await this.ethersService.trackGasUsage();
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async getHash(message: string) {
    try {
      // Todo: generateHash의 값을 리턴합니다.
      return await this.ethersService.generateHash(message);
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async withdraw(value: number) {
    try {
      // Todo: withDraw의 값을 리턴합니다.
      return await this.ethersService.withdraw(value);
    } catch (error) {
      /*
        Todo: 스마트 컨트랙트에서 발생한 오류 유형에 따라 예외를 정의합니다.
  
        - 예외: 컨트랙트에서 에러 처리를 응답으로 반환
          → ownerFunction 함수 호출 시 권한이 없는 address의 에러로 "Only the owner can call withdraw."가 반환된 경우
          → exceptions.ONLY_OWNER 반환
  
          예시:
          error.reason === "Only the owner can call withdraw."
  
        - 예외: 그 외 오류들
          → exceptions.createBadRequestException(error.message)
      */
      if (error.reason === "Only the owner can call withdraw.") {
        throw exceptions.ONLY_OWNER;
      } else {
        throw exceptions.createBadRequestException(error.message)
      };
    }
  }
}
