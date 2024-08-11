import { type RequestHandler } from "express";
import { LanguageService } from "./language.service";

import  axios from "axios"


interface LanguageInfo {
  code: string;
  name: string;
  autonym: string;
}

interface ApiResponse {
  batchcomplete: string;
  query: {
    languageinfo: {
      [key: string]: {
        code: string;
        bcp47: string;
        dir: string;
        autonym: string;
        name: string;
        variants: string[];
      };
    };
  };
}

export class LanguageController {
  private languageService: LanguageService;

  constructor() {
    this.languageService = new LanguageService();
  }

//endpoint : string = "https://commons.wikimedia.org/w/api.php";
//let parties = this.endpoint.split(":");
//console.log(this->parties.length > 1 ? parties[1] : undefined);

//?format=json&action=query&list=categorymembers&cmtitle=Category:Lingua_Libre_pronunciation&cmlimit=500"

getAllLanguageList: RequestHandler = async (req, res) =>   {
  try {
    const response = await axios.get<ApiResponse>('https://commons.wikimedia.org/w/api.php', {
      params: {
        action: 'query',
        meta: 'languageinfo',
        liprop: 'code|name|autonym',
        format: 'json',
      },
    });

    const languages = response.data.query.languageinfo;
    const filteredLanguages: object[] = [];
    //console.log(languages);
    for (const [code, info] of Object.entries(languages)) {
      //console.log(info);
      let label:string = info.autonym
      if(info.autonym === ""){
        //console.log("object");
        label = info.name 
      }
      //console.log(label);

      filteredLanguages.push({"code": info.code,
            "name": label,
        })
        
    }

    res.json(filteredLanguages);
  } catch (error) {
    console.error('Error fetching language info:', error);
    res.status(500).json({ error: 'An error occurred while fetching language information' });
  }
};
}

