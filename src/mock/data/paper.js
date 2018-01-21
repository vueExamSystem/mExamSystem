import Mock from 'mockjs';
import _ from 'lodash';

const PaperList = [];

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

const ProblemList = [{
    id: '1',
    isNecessary: true,//必做題
    type:'radio',//題目類型
    title: '某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是（）',
    options:[{
        flag:'A',
        text:'直线运动且是匀变速直线运动'
    },{
        flag:'B',
        text:'曲线运动但加速度方向不变、大小不变，是匀变速运动'
    },{
        flag:'C',
        text:'曲线运动但加速度方向改变、大小不变，是非匀变速曲线运动'
    },{
        flag:'D',
        text:'曲线运动，加速度大小和方向均改变，是非匀变速曲线运动'
    }]
},{
    id: '2',
    isNecessary: true,//必做題
    type:'radio',//題目類型
    title: '某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是（）',
    options:[{
        flag:'A',
        text:'直线运动且是匀变速直线运动'
    },{
        flag:'B',
        text:'曲线运动但加速度方向不变、大小不变，是匀变速运动'
    },{
        flag:'C',
        text:'曲线运动但加速度方向改变、大小不变，是非匀变速曲线运动'
    },{
        flag:'D',
        text:'曲线运动，加速度大小和方向均改变，是非匀变速曲线运动'
    }]
},{
    id: '3',
    isNecessary: true,
    type:'check',
    title: '某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是（）',
    options:[{
        flag:'A',
        text:'直线运动且是匀变速直线运动'
    },{
        flag:'B',
        text:'曲线运动但加速度方向不变、大小不变，是匀变速运动'
    },{
        flag:'C',
        text:'曲线运动但加速度方向改变、大小不变，是非匀变速曲线运动'
    },{
        flag:'D',
        text:'曲线运动，加速度大小和方向均改变，是非匀变速曲线运动'
    }]
},{
    id: '4',
    isNecessary: true,
    type:'check',
    title: '某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是（）',
    options:[{
        flag:'A',
        text:'直线运动且是匀变速直线运动'
    },{
        flag:'B',
        text:'曲线运动但加速度方向不变、大小不变，是匀变速运动'
    },{
        flag:'C',
        text:'曲线运动但加速度方向改变、大小不变，是非匀变速曲线运动'
    },{
        flag:'D',
        text:'曲线运动，加速度大小和方向均改变，是非匀变速曲线运动'
    }]
},{
    id: '5',
    isNecessary: true,
    type:'check',
    title: '某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是（）',
    options:[{
        flag:'A',
        text:'直线运动且是匀变速直线运动'
    },{
        flag:'B',
        text:'曲线运动但加速度方向不变、大小不变，是匀变速运动'
    },{
        flag:'C',
        text:'曲线运动但加速度方向改变、大小不变，是非匀变速曲线运动'
    },{
        flag:'D',
        text:'曲线运动，加速度大小和方向均改变，是非匀变速曲线运动'
    }]
},{
    id: '6',
    isNecessary: true,
    type:'judge',
    title: '某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是直线运动且是匀变速直线运动。',
    options:[{
        flag:'A',
        text:'正确'
    },{
        flag:'B',
        text:'错误'
    }]
},{
    id: '7',
    isNecessary: true,
    type:'judge',
    title: '某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是直线运动且是匀变速直线运动。',
    options:[{
        flag:'A',
        text:'正确'
    },{
        flag:'B',
        text:'错误'
    }]
},{
    id: '8',
    isNecessary: true,
    type:'judge',
    title: '某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是直线运动且是匀变速直线运动。',
    options:[{
        flag:'A',
        text:'正确'
    },{
        flag:'B',
        text:'错误'
    }]
},{
    id: '9',
    isNecessary: true,
    type:'judge',
    title: '某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是直线运动且是匀变速直线运动。',
    options:[{
        flag:'A',
        text:'正确'
    },{
        flag:'B',
        text:'错误'
    }]
},{
    id: '10',
    isNecessary: false,
    type:'radio',
    title: '某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是（）',
    options:[{
        flag:'A',
        text:'直线运动且是匀变速直线运动'
    },{
        flag:'B',
        text:'曲线运动但加速度方向不变、大小不变，是匀变速运动'
    },{
        flag:'C',
        text:'曲线运动但加速度方向改变、大小不变，是非匀变速曲线运动'
    },{
        flag:'D',
        text:'曲线运动，加速度大小和方向均改变，是非匀变速曲线运动'
    }]
},{
    id: '11',
    isNecessary: false,
    type:'radio',
    title: '某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是（）',
    options:[{
        flag:'A',
        text:'直线运动且是匀变速直线运动'
    },{
        flag:'B',
        text:'曲线运动但加速度方向不变、大小不变，是匀变速运动'
    },{
        flag:'C',
        text:'曲线运动但加速度方向改变、大小不变，是非匀变速曲线运动'
    },{
        flag:'D',
        text:'曲线运动，加速度大小和方向均改变，是非匀变速曲线运动'
    }]
}];

export {
    PaperList,
    ProblemList
};
