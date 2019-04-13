
const colors = ['#DDE0E6', '#4A5E6C', '#E7CECC', '#937C6E', 
  '#DB955F', '#D7ACA5', '#62748C', '#D5C2BA'];

const init = () => {
  const initialLinks = [
    {
      title: '示范',
      url: 'http://www.baidu.com',
      color: '#DB955F',
      subUrls: [
        {
          title: '斗鱼',
          url: 'http://www.baidu.com',
        }
      ]
    }
  ]
  localStorage.links = JSON.stringify(initialLinks);
  return initialLinks
}

const getLinks = () => {
  const localLinks = localStorage.links;
  let links;
  if(localLinks) {
    links = JSON.parse(localLinks);
  } else {
    links = init();
  }
  return links;
}
const createLink = (title, url) => {
  return {
    title,
    url,
    color: colors[~~(Math.random() * colors.length)],
    subUrls: []
  }
}
const setLinks = (links) => {
  localStorage.links = JSON.stringify(links);
}
export default {
  getLinks,
  setLinks,
  createLink
}