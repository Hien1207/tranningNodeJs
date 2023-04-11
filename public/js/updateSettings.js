import axios from 'axios';
import {
    showAlert
} from './alerts';

export const updateSettings = async (data, type) => {
    try {
        const url = type === 'password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe';
        const res = await axios({
            method: 'PATCH',
            url,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            },
            data
        });

        if (res.data.status === 'success') {
            showAlert('success', `${type.toUpperCase()} updated successfully`);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);

    }

};