export default class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
      this.getInitialCards=this.getInitialCards.bind(this);
      this.delCard=this.delCard.bind(this);
      this.like=this.like.bind(this);
      this.dislike=this.dislike.bind(this);
    }
  
    getInitialCards(handler) {
    const url = this.baseUrl+'/cards';
    const options = {headers: this.headers}
   
    return  fetch(url, options)
            .then(res => {
              if (res.ok) {
                return res.json();
              }
          
              // если ошибка, переходим в catch
              return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then( result => {
              handler(result);
            })
            .catch((err) => {
              console.log(err); // выведем ошибку в консоль
            });
    
    }



    getUserInfo(handler) {
      const url = this.baseUrl+'/users/me';
      const options = {headers: this.headers}
     
      return  fetch(url, options)
              .then(res => {
                if (res.ok) {
                  return res.json();
                }
            
                // если ошибка, переходим в catch
                return Promise.reject(`Ошибка: ${res.status}`);
              })
              .then( result => {
                handler(result);
              })
              .catch((err) => {
                console.log(err); // выведем ошибку в консоль
              });
      
      }


      editProfile(values) {
        const url = this.baseUrl+'/users/me';
        const options = {method: 'PATCH', 
                        headers: this.headers,
                        body: JSON.stringify({
                          name: values.name,
                          about: values.about
                        })}
       
        return  fetch(url, options)
                .then(res => {
                  if (res.ok) {
                    return res.json();
                  }
              
                  // если ошибка, переходим в catch
                  return Promise.reject(`Ошибка: ${res.status}`);
                })
        
        }


        editAvatar(link) {
          const url = this.baseUrl+'/users/me/avatar';
          const options = {method: 'PATCH', 
                          headers: this.headers,
                          body: JSON.stringify({
                            avatar: link
                          })}
         
          return  fetch(url, options)
                  .then(res => {
                    if (res.ok) {
                      return res.json();
                    }
                
                    // если ошибка, переходим в catch
                    return Promise.reject(`Ошибка: ${res.status}`);
                  })
                  .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                  });
          
          }


        postCard(cardValues) {
          const url = this.baseUrl+'/cards';
          const options = {method: 'POST', 
                          headers: this.headers,
                          body: JSON.stringify({
                            name: cardValues.name,
                            link: cardValues.link
                          })}
         
          return  fetch(url, options)
                  .then(res => {
                    if (res.ok) {
                      return res.json();
                    }
                
                    // если ошибка, переходим в catch
                    return Promise.reject(`Ошибка: ${res.status}`);
                  });
          
          }



          delCard(cardId) {
            const url = this.baseUrl+'/cards/'+cardId;
            const options = {method: 'DELETE', 
                            headers: this.headers
                            }

            return  fetch(url, options)
                    .then(res => {
                      if (res.ok) {
                        return res.json();
                      }
                  
                      // если ошибка, переходим в catch
                      return Promise.reject(`Ошибка: ${res.status}`);
                    })
                    .catch((err) => {
                      console.log(err); // выведем ошибку в консоль
                    });
            
            }


            like(cardId) {
              const url = this.baseUrl+'/cards/like/'+cardId;
              const options = {method: 'PUT', 
                              headers: this.headers
                              }

              return  fetch(url, options)
                      .then(res => {
                        if (res.ok) {
                          return res.json();
                        }
                        // если ошибка, переходим в catch
                        return Promise.reject(`Ошибка: ${res.status}`);
                      })
                      .catch((err) => {
                        console.log(err); // выведем ошибку в консоль
                      });
              
              }


              dislike(cardId) {
                const url = this.baseUrl+'/cards/like/'+cardId;
                const options = {method: 'DELETE', 
                                headers: this.headers
                                }
  
                return  fetch(url, options)
                        .then(res => {
                          if (res.ok) {
                            return res.json();
                          }
                          // если ошибка, переходим в catch
                          return Promise.reject(`Ошибка: ${res.status}`);
                        })
                        .catch((err) => {
                          console.log(err); // выведем ошибку в консоль
                        });
                
                }
  
 
  }
  
