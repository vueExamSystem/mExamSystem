import Mock from 'mockjs';
import _ from 'lodash';

const _selectArr = [
    {
        id: '0',
        name: '筛选项_0'
    },
    {
        id: '1',
        name: '筛选项_1'
    },
    {
        id: '2',
        name: '筛选项_2'
    },
];
const TypeList = [];
const UsageList = [];
const DepartmentList = [];
const ChapterList = [];
const SubjectList = [];
const QuestionList = [];
const TagList = [];
const CourseList = [];

for (let i = 0; i < 3; i++) {
    TypeList.push(Mock.mock({
        id: i,
        name: `类型_${i}`,
    }));
}
for (let i = 0; i < 3; i++) {
    UsageList.push(Mock.mock({
        id: i,
        name: `用途_${i}`,
    }));
}
for (let i = 0; i < 3; i++) {
    SubjectList.push(Mock.mock({
        id: i,
        name: `科目_${i}`,
    }));
}
for (let i = 0; i < 3; i++) {
    ChapterList.push(Mock.mock({
        id: i,
        name: `章节_${i}`,
        subject: '大学物理',
        creator: 'admin',
        desc: '描述',
    }));
}
for (let i = 0; i < 86; i++) {
    QuestionList.push(Mock.mock({
        id: Mock.Random.id(),
        name: '万有引力',
        type: '单选',
        subject: '大学物理',
        chapter: '基础物理',
        creator: 'admin',
        same: '组01',
    }));
}
for (let i = 0; i < 20; i++) {
    const arr = _.slice(QuestionList, i * 3, i * 3 + 4);
    DepartmentList.push(Mock.mock({
        id: i,
        name: `题组_${i}`,
        subject: '大学物理',
        chapter: '第一章',
        children: arr,
    }));
}
for (let i = 0; i < 86; i++) {
    TagList.push(Mock.mock({
        id: i,
        name: `标签${i}`,
        creator: 'admin',
        desc: '描述',
    }));
}
for (let i = 0; i < 86; i++) {
    CourseList.push(Mock.mock({
        id: i,
        name: `课程${i}`,
        subject: '物理',
        grade: '14级',
        creator: 'admin',
    }));
}

export {
    TypeList,
    UsageList,
    SubjectList,
    ChapterList,
    DepartmentList,
    QuestionList,
    CourseList,
    TagList,
};
