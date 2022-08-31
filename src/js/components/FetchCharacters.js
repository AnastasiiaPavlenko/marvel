const marvelURL = 'https://gateway.marvel.com/v1/public/',
      MARVEL_PUBLIC_API_KEY="c317f50b63408e3262b39148a75c962a",
      apiKey = `apikey=${MARVEL_PUBLIC_API_KEY}`;

const getMarvelCharacters = () => {
  const { offset, name, exactMatch, sortName, limit, ts } = Object.assign({
      offset: 0,
      name: '',
      exactMatch: false,
      sortName: '',
      limit: 100,
      ts: new Date().getTime(),
  });

  let url = `${marvelURL}characters?${apiKey}&offset=${offset}&orderBy=${sortName}name&limit=${limit}&ts=${ts}`;

  if (name) {
    if (exactMatch) { url += `&name=${name}`;}
    else { url += `&nameStartsWith=${name}`;}
  }

  return fetch(url)
          .then(res => res.json())
          .then((resObj) => {
            try {
              if (resObj.code === 200) {
                if (offset > resObj.data.total) {
                    throw new Error('Requested page does not exist.');
                } else {
                    const pages = Math.floor(resObj.data.total / limit);
                    return {
                      characters: resObj.data.results,
                      maxPage: resObj.data.total % limit > 0 ? pages + 1 : pages,
                  };
                }
              } else {
                throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
              }
            } catch (e) {
              console.error(e);
              return {
                characters: [],
                maxPage: 0,
              };
            }
          });
}

export default getMarvelCharacters