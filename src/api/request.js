import axios from 'axios';
import _ from 'lodash';

export default function createApi() {
    const token = sessionStorage.getItem('token');

    return {
        get(url, query) {

            axios({
                method: 'get',
                url: url,
                header: {
                    token,
                },
                data: query,
                error: (res) => {

                },
            });
        },

        post(url, query) {

            axios({
                method: 'post',
                url: url,
                data:query,
                header: {
                    token: '',
                },
                error: (res) => {

                },
            });
        },
    };

    function request(url, options) {
        return Promise.race([
            axios(url, options)
                .then()
                .then(),
            new Promise(
                (rosolve, reject) => {
                    setTimeout(
                        () => reject('请求超时'),
                        60000,
                    );
                }
            ),
        ])
    }

}