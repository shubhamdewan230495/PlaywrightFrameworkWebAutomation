import { test, APIRequestContext, expect} from '@playwright/test';
import {NetworkHandler} from '../../utils/NetworkHandler'
import {postData, getDataComments} from "../../Payload/postsData"

let handler: NetworkHandler;

test.beforeEach(({request})=>{
    handler = new NetworkHandler(request);
})

test(`Get Posts API `, async ({request}) => {
 const response = await (await handler.triggerRequest(postData)).json()
expect(response.userId).toBe(1)
expect(response.id).toBe(1)
expect(response.title).toBe("delectus aut autem")
expect(response.completed).toBe(false)
});

test(`Get comments`, async ({request}) => {
    const response = await (await handler.triggerRequest(getDataComments)).json()
    console.log(response)
   expect(response.userId).toBe(1)
   expect(response.id).toBe(1)
   expect(response.title).toBe("delectus aut autem")
   expect(response.completed).toBe(false)
   });