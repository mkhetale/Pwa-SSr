/* import axios from "axios"; */
export default async ({route, store, $axios, redirect, app}) => {
  try {
    const pageMetaData = await getPageMeta($axios, route.path);
    if(pageMetaData.action && pageMetaData.action.type === 'redirect') {
      redirect(pageMetaData.action.url)
    }
    store.dispatch('page/updatePageMeta', pageMetaData);
    updateHeaderClass(store, route);
    toggleMenu(store, false)
  } catch(error) {
    console.log(error);
  }
}

async function getPageMeta (axios, url) {
  try {
    const response = await axios.get('core/v1/url_meta', {params: { url }})
    return response.data.data;
  } catch (error) {
    return error.response;
  }
}

async function getTrendingSearch (axios, store) {
  try {
    const response = await axios.get('/api/search/trending')
    store.dispatch('common/saveTrendingSearch', response.data.data[0].section_data)
  } catch (error) {
    return error.response;
  }
}

function toggleMenu (store, bool) {
  store.dispatch('app/toogleMenu', bool);
}

function updateHeaderClass(store, route) {
  let headerClass = 'header_withSearch';
  if(route.matched.length && route.matched[0].meta) {
    headerClass = route.matched[0].meta.header
  }
  store.dispatch('app/updateHeaderClass', headerClass);
}


