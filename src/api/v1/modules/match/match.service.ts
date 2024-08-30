import axios, { AxiosResponse } from "axios";
import { APP_CONF } from "../../../../config/app-config";

interface WikidataResult {
  item: { value: string };
  itemLabel: { value: string };
}

interface WikidataResponse {
  results: {
    bindings: WikidataResult[];
  };
}

export class MatchService {
  private apiFilesUrl: string;
  private apiLexUrl: string;
  private apiClaimsUrl: string;

  constructor() {
    // Define the base URL of the API
    this.apiFilesUrl = APP_CONF.apiFilesUrl;
    this.apiLexUrl = APP_CONF.apiLexUrl;
    this.apiClaimsUrl = APP_CONF.apiClaimsUrl;
  }

  // Method to fetch data from the API
  public async getMatches(langCat: string): Promise<any> {
    try {
      // Get all pronunciation files
      let allLLP: any = await this.getLLPFiles(langCat);
      // Get lexeme part inside the lexeme title
      allLLP = Promise.all(
        allLLP["query"]["categorymembers"].map((file: any) => {
          return {
            ...file,
            form: this.queryWikidata(this.getFileLabel(file.title), "en"),
          };
        })
      );
      // Get the Claim for each file
      allLLP = allLLP.map((file: any) => {
        return {
          ...file,
          claims: this.getLexEntity(this.getFileLabel(file.form)),
        };
      });
      return allLLP;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Propagate the error for further handling
    }
  }
  public async getLLPFiles(langCat: string): Promise<any> {
    try {
      // Get all pronunciation files
      if (langCat.length > 0) {
        let customUrl: string = this.apiFilesUrl.replace("{___}", langCat);
        const response: AxiosResponse = await axios.get(customUrl);
        return response.data; // Return the fetched data
      }
      return [];
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Propagate the error for further handling
    }
  }
  public async getLexEntity(lexeme: string): Promise<any> {
    try {
      // Get all pronunciation files
      if (lexeme.length > 0) {
        let customUrl: string = this.apiLexUrl.replace("{___}", lexeme);
        const response: AxiosResponse = await axios.get(customUrl);
        return response.data; // Return the fetched data
      }
      return [];
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Propagate the error for further handling
    }
  }

  public async queryWikidata(
    messageName: string,
    langCode: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<WikidataResult[]> {
    const endpointUrl = "https://query.wikidata.org/sparql";
    const query = `
    SELECT * WHERE {
        ?l ontolex:lexicalForm/ontolex:representation "${messageName}"@${langCode} .
      }
        `;

    try {
      const response = await axios.get<WikidataResponse>(endpointUrl, {
        params: {
          query: encodeURIComponent(query),
          format: "json",
        },
        headers: { Accept: "application/sparql-results+json" },
      });
      console.log(response.data.results.bindings);
      return response.data.results.bindings;
    } catch (error) {
      console.error("Error querying Wikidata:", error);
      return [];
    }
  }

  public async getLexEntityClaims(listOfEntities: any): Promise<any> {
    try {
      // Get all pronunciation files
      if (listOfEntities.length > 0) {
        // add the first identifer
        let identifiers: string = "" + listOfEntities[0].id;
        // Add all Next
        for (let i: number = 1; i < listOfEntities.length - 1; i++) {
          identifiers += "|" + listOfEntities[i].id;
        }
        // Use the concatenate version to request for claims
        let customUrl: string = this.apiClaimsUrl.replace("{___}", identifiers);
        const response: AxiosResponse = await axios.get(customUrl);
        return response.data; // Return the fetched data
      }
      return [];
    } catch (error) {
      console.error("Error fetching claims data:", error);
      throw error; // Propagate the error for further handling
    }
  }

  public getFileLabel(title: string): string {
    if (title.length > 0) {
      let titleSplits: string[] = title.split("-"); // split it in various part
      let lexLabel: string[] = titleSplits[titleSplits.length - 1].split("."); // remove the extension
      return lexLabel[0];
    }
    return "";
  }
}
