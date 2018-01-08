import Mock from 'mockjs';
import _ from 'lodash';

const PaperList = [];
const PaperDetail = {
    name:'物理期中试卷',
    total:100,
    radio:{
        count: 10,
        perScore:2
    },
    check:{
        count: 10,
        perScore:4
    },
    judge:{
        count:10,
        perScore:2
    },
    option:{
        count:5,
        perScore:4
    }
};

for (let i = 0; i < 10; i++) {
    PaperList.push(Mock.mock({
        id: i+1,
        name:'物理期中考试',
        time:'60',
        project:'大学物理',
        category:'随机',
        status: i%3,
        creator:'admin'
    }));
}

const getDetail = () => {
    var status = Math.floor(Math.random() * 3);console.log('status',status)
    PaperDetail.status = status.toString();
    if(PaperDetail.status === '0'){
        
    }else if(PaperDetail.status === '1'){

    }else{

    }
};
getDetail();

export {
    PaperList,
    PaperDetail
};
