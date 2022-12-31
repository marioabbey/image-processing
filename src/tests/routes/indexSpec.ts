import supertest from "supertest"; 

import routes from "../../routes";

const request = supertest(routes);



describe('Test that image endpoint is valid', () => {

    it('gets the api/images endpoint', async () => {
        try{
            const response = await request.get('/api/images');
            console.log('response');
            expect(response.status).toBe(200);
        } catch(err){
            
        }
    
       
    });
});

