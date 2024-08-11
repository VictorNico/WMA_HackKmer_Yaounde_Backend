import { type RequestHandler } from "express";
import { LanguageService } from "./language.service";

import  axios from "axios"

interface resAPI{
  batchcomplete : Object;

}

export class LanguageController {
  private languageService: LanguageService;

  constructor() {
    this.languageService = new LanguageService();
  }

endpoint : string = "https://commons.wikimedia.org/w/api.php";
//let parties = this.endpoint.split(":");
//console.log(this->parties.length > 1 ? parties[1] : undefined);

//?format=json&action=query&list=categorymembers&cmtitle=Category:Lingua_Libre_pronunciation&cmlimit=500"

getAllLanguageList: RequestHandler = async (req, res) => {

  try{

    const response =  await axios.get(this.endpoint, {
      
    params: {
      format: 'json',
      action: 'query',
      list: 'categorymembers',
      cmtitle : 'Category:Lingua_Libre_pronunciation',
      cmlimit : 500,
      //...req.query
    }});
 

    interface CategoryMemeber{
      pageid: number,
      ns: number,
      title: string
    }

    interface Qresults {
      categorymembers: CategoryMemeber[]
    }
    
    interface APIres{
      batchcomplete: string,
      query : Qresults
    }

    const PreResponse : APIres = response.data

    const tabLanguage = PreResponse['query']['categorymembers']

    const finalLanguage:string[] = []

    tabLanguage.forEach(element =>{
      const split_tab = element['title'].split("-")
      if(split_tab.length > 1){
        if(split_tab[1].length ==3){
          finalLanguage.push(split_tab[1])
        }
        
      }
    })

    res.json({'languages' : finalLanguage});

    


    //console.log(preRec["query"]);
    
    


    return res.status(200); 
    //console.log(response.data);
    /*
    return res.status(200).json({
      message: "return languages",
    });*/

    }catch(error){
      res.status(500).json({
        message: "server error -> return languages",
      });
    };
    
  };
}
