import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get('/api/date').catch(err=>{console.log(err)});
    return res.data || [];
  },
  add: async (myForm) => {
    let res = await axios.post('/api/date',myForm);
    return res.data || [];
  },
  edit: async (myForm) => {
    let res = await axios.post('/api/date/edit',myForm);
    return res.data || [];
  },
  delete: async (req) => {
    let res = await axios.post('/api/date/delete',req).catch(err=>{console.log(err)});
    return res.data || [];
  }
}
