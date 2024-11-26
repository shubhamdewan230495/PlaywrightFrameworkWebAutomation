import { APIRequestContext, APIResponse } from "@playwright/test"
import { error } from "console";
export class NetworkHandler{
    readonly request: APIRequestContext;

constructor(request: APIRequestContext){
    this.request = request;
}



triggerRequest=(async (data: any) : Promise<any> => {
    if(data.method === 'POST'){
        return await this.request.post(data.baseURL+data.endURL,
            {
                headers : data.header,
                data : data.payload
            }
        );
    }
    else if(data.method === 'GET'){
        return await this.request.get(data.baseURL+data.endURL,
            {
                headers : data.header
            }
        );
    }
    else if(data.method === 'PUT'){
        return await this.request.put(data.baseURL+data.endURL,
            {
                headers : data.header,
                data : data.payload
            }
        );
    }
    else{
        console.log("Method not implemented for now.")
        return null;
    }
    
});

}