import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_BASE_URL = "https://www.wikidata.org/w/api.php";

interface ClaimRequest {
  id: string;
  type: string;
  mainsnak: {
    snaktype: string;
    property: string;
    datavalue: {
      value: string;
      type: string;
    };
    datatype: string;
  };
}

interface QualifierRequest {
  entityType: string;
  id: string;
}

export class MatchService {
  private token: string;

  constructor() {
    this.token = "your_token_here"; // user token
  }

  public async processMatch(id: string, label: string): Promise<any> {
    try {
      const claimData = await this.setClaim(id, label);

      if (!claimData.claim || claimData.claim.id !== id) {
        throw new Error("ID does not match the claim");
      }

      const claimIdWithUUID = `${claimData.claim.id}$${uuidv4()}`;

      const qualifierData = await this.addQualifier(claimIdWithUUID);

      return {
        message: "Match added successfully",
        claimResponse: claimData,
        qualifierResponse: qualifierData,
        matched: true,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async setClaim(id: string, label: string): Promise<any> {
    const claim: ClaimRequest = {
      id,
      type: "claim",
      mainsnak: {
        snaktype: "value",
        property: "P443", // Property for the audio file
        datavalue: {
          value: label,
          type: "string",
        },
        datatype: "commonsMedia",
      },
    };

    const response = await axios.post(API_BASE_URL, null, {
      params: {
        action: "wbsetclaim",
        format: "json",
        claim: JSON.stringify(claim),
        token: this.token,
      },
    });

    return response.data;
  }

  private async addQualifier(claimIdWithUUID: string): Promise<any> {
    const qualifierRequest: QualifierRequest = {
      entityType: "item",
      id: "Q33578", // The entity type ID for the pronunciation variety
    };

    const response = await axios.post(API_BASE_URL, null, {
      params: {
        action: "wbsetqualifier",
        format: "json",
        claim: claimIdWithUUID,
        property: "P5237", // Property for pronunciation variety
        value: JSON.stringify(qualifierRequest),
        snaktype: "value",
        token: this.token,
      },
    });

    return response.data;
  }
}
