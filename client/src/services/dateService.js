import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get('/api/date');
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
    let res = await axios.post('/api/date/delete',req);
    return res.data || [];
  }
}
