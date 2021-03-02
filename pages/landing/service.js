import { api } from '../../api'

export default {
  getLandingpage () {
    return api.get('core/v1/view?container_for=web&gender=unisex&view_name=home')
  }
}
