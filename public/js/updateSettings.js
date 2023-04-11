import axios from 'axios';
import {
    showAlert
} from './alerts';

export const updateSettings = async (name, email) => {
    console.log(name, email);
    try {
        // const url = type === 'password' ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword' : 'http://127.0.0.1:3000/api/v1/users/updateMe';
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            },
            data : {
                name,
                email
            }
        });

        if (res.data.status === 'success') {
            showAlert('success', `Data updated successfully`);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);

    }

};