import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get('/api/date');
    return res.data || [];
  },
  postAll: async (myForm) => {
    let res = await axios.post('/api/date/edit',myForm);
    console.log("Hello from service");
    console.log(test);
    return res;
  }
}
