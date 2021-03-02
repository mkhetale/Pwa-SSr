// import Cookies from 'universal-cookie'
export const state = () => ({
  counter: 0,
  loginStatus: false,
  authToken: '',
  megaMenu: [],
  selectedGender: 'male'
});

export const mutations = {
  increment(state) {
    state.counter++;
  },
  saveUserState(state, data) {
    state.loginStatus = data.is_login;
    state.authToken = data.access_token;
  },
  saveMegaMenu(state, data) {
    state.megaMenu = data;
  },
  toogleGender(state, gender) {
    state.selectedGender = gender;
  }
};

export const actions = {
  async nuxtServerInit ({ commit }, { app, $axios }) {
    const authCookie = app.$cookies.get(process.env.VUE_APP_AUTHCOOKIE, {domain: process.env.VUE_APP_COOKIE});
    if (authCookie) {
      $axios.setToken(authCookie, 'bearer');
      $axios.setHeader('Authorization', `bearer ${authCookie}`);
    }
    try {
      const [tokenResponse] = await Promise.all([checkToken($axios, app)]);
      if (tokenResponse) {
        setAuthCookie(tokenResponse.access_token, app)
        $axios.setToken(tokenResponse.access_token, 'bearer');
        // $axios.setHeader('Authorization', `bearer ${tokenResponse.access_token}`);
        commit('saveUserState', tokenResponse);  
      }
      syncCart(commit, $axios, app)  
    } catch (error) {
      console.log(error, 'errorToken')
    }
    /* commit('saveMegaMenu', megaMenuResponse); */
  },
  toogleGender ({commit}, gender) {
    commit('toogleGender', gender);
  }
};

export const getters = {
  getSelectedGender (state) {
    return state.selectedGender;
  },
  getMegaMenu (state) {
    return state.megaMenu.filter(obj => obj.gender_key === state.selectedGender)
  }
}

export const strict = false

async function checkToken (axios, app) {
  try {
    const data = {
      app_version: '',
      device_token: 'web',
      device_type: 'web',
      os_version_code: 'web'
    }
    const response = await axios.post('/auth/token', data);
    return response.data.data;
  } catch (error) {
    return error.response
  }
}

function setAuthCookie (token, app) {
  app.$cookies.set(process.env.VUE_APP_AUTHCOOKIE, token, {domain: process.env.VUE_APP_COOKIE})
}

async function syncCart (commit, axios, app) {
  cartInit(axios, app)
    .then((CartId) => {
      commit('common/updateCartId', CartId)
      peekCartProducts(CartId, commit, axios, app)
    })
}

async function peekCartProducts (cartId, commit, axios, app) {
  axios.get(`${process.env.VUE_APP_CARTSYNC}/cart_api/v3/peek`, {params: {cart_id: cartId}})
    .then((response) => {
      const {products} = response.data.data
      commit('common/updateBag', products)
    })
    .catch((error) => {
      console.log(error, 'errorCartt')
      app.$cookies.remove(process.env.VUE_APP_CARTID, {domain: process.env.VUE_APP_COOKIE})
      syncCart()
    })
}

async function cartInit (axios, app) {
  return new Promise((resolve, reject) => {
    const cartId = app.$cookies.get(process.env.VUE_APP_CARTID, {domain: process.env.VUE_APP_COOKIE})
    if (!cartId) {
      axios.get(`${process.env.VUE_APP_CARTSYNC}/cart_api/v3/initialize`)
        .then((response) => {
          const newCartId = response.data.data.cart_id
          saveNewCartID(newCartId, app)
          resolve(newCartId)
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      resolve(cartId)
    }
  })
}

function saveNewCartID (newCartID, app) {
  app.$cookies.set(process.env.VUE_APP_CARTID, newCartID, {domain: process.env.VUE_APP_COOKIE})
}

async function getMegaMenu (axios) {
  try {
    const response = await axios.get('/core/v1/view/header');
    return response.data.data;
  } catch(error) {
    return error.response
  }
}
