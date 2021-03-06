import Mock from 'mockjs';
import _ from 'lodash';

//查看题目列表
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
},{
    id: '12',
    isNecessary: false,
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
}];


//查看答题详情列表
const AnalysisList = [{
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
    }],
    answer:'B',
    myAnswer: 'A',
    isSuccess: false,
    analysis:'光滑、摩擦力',
    keynote:'曲线运动，匀速运动',
    creator:'Admin'
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
    }],
    answer:'A',
    myAnswer: 'A',
    isSuccess: true,
    analysis:'光滑、摩擦力',
    keynote:'曲线运动，匀速运动',
    creator:'Admin'
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
    }],
    answer:['A','B'],
    myAnswer: ['A','B','C'],
    isSuccess: false,
    analysis:'光滑、摩擦力',
    keynote:'曲线运动，匀速运动',
    creator:'Admin'
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
    }],
    answer:['A','B'],
    myAnswer: ['A','B'],
    isSuccess: true,
    analysis:'光滑、摩擦力',
    keynote:'曲线运动，匀速运动',
    creator:'Admin'
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
    }],
    answer:['A','B'],
    myAnswer: ['A'],
    isSuccess: false,
    analysis:'光滑、摩擦力',
    keynote:'曲线运动，匀速运动',
    creator:'Admin'
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
    }],
    answer:'A',
    myAnswer: 'B',
    isSuccess: false,
    analysis:'光滑、摩擦力',
    keynote:'曲线运动，匀速运动',
    creator:'Admin'
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
    }],
    answer:'B',
    myAnswer: 'B',
    isSuccess: true,
    analysis:'光滑、摩擦力',
    keynote:'曲线运动，匀速运动',
    creator:'Admin'
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
    }],
    answer:'A',
    myAnswer: 'A',
    isSuccess: true,
    analysis:'光滑、摩擦力',
    keynote:'曲线运动，匀速运动',
    creator:'Admin'
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
    }],
    answer:'B',
    myAnswer: 'A',
    analysis:'光滑、摩擦力',
    keynote:'曲线运动，匀速运动',
    creator:'Admin'
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
    }],
    answer:'B',
    myAnswer: 'A',
    isSuccess: false,
    analysis:'光滑、摩擦力',
    keynote:'曲线运动，匀速运动',
    creator:'Admin'
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
    }],
    answer:'B',
    myAnswer: '',
    isSuccess: false,
    analysis:'光滑、摩擦力',
    keynote:'曲线运动，匀速运动',
    creator:'Admin'
},{
    id: '12',
    isNecessary: false,
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
    }],
    answer: ['A','B'],
    myAnswer: ['A','B'],
    isSuccess: true,
    analysis:'光滑、摩擦力',
    keynote:'曲线运动，匀速运动',
    creator:'Admin'
}];

export {
    ProblemList,
    AnalysisList
};
