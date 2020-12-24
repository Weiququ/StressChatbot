/*
 * @Author: your name
 * @Date: 2020-11-30 14:54:03
 * @LastEditTime: 2020-11-30 14:54:03
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\utils\test.js
 */

import { arrowRedo, fastFoodSharp } from "ionicons/icons";

 //2.在二叉排序树{value:Number, left:Object, right:Object}上面找出第3大的节点。
 //注意：不能把二叉树全量存储到另外的存储空间，比如存储到数组中，然后取出数组的第三个元素。
let k = 0;
const findNthNum = (root, n) => {
    if (!root) return;
    findNthNum(root.right, n);
    k++;
    console.log(k, root.val)
    if(k===n) return root.val
    findNthNum(root.left, n);
}

var node4 = {left: null, right: null, val: 3 }; 
var node5 = {left: null, right: null, val: 5 }; 
var node6 = {left: null, right: null, val: 7 }; 
var node7 = {left: null, right: null, val: 10 };
var node3 = {left: node6, right: node7, val: 9 };
var node2 = {left: node4, right: node5, val: 4 };
var node1 = {left: node2, right: node3, val: 6 };
findNthNum(node1, 3)

//
const getMiddleNode = (head) => {
    if(!head || !head.next) {
        return head;
        console.log('head')
    }
    let slow = head, fast = head;
    console.log('fast', fast, fast.next, fast.next.next)
    while(fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
        console.log('slow', slow)
        
    }
    return slow;
}

node4 = {val:4, next: null}
node3 = {val: 3, next: node4}
node2 = {val: 2, next: node3}
head = {val: 1, next: node2}
getMiddleNode(head)

node4 = {value: 7, next: null}
node3 = {value: 5, next: node4}
node2 = {value: 3, next: node3}
head1 = {value: 1, next: node2}


node8 = {value: 6, next: null}
node7 = {value: 5, next: node8}
node6 = {value: 4, next: node7}
node5 = {value: 3, next: node6}
head2 = {value: 2, next: node5}

const getCommonNode = (node1, node2) => {
    let head, node3;
    while(node1 && node2) {
        if (node1.value === node2.value) {
            if (!head) {
                head = node1;
                node3 = head; 
            } else {
                node3.next = node1;
            }
            node1 = node1.next;
            node2 = node2.next;
        } else if (node1.value < node2.value) {
            node1 = node1.next;
        } else {
            node2 = node2.next;
        }
    }
    return head;
}

getCommonNode(head1, head2)

//6.反转数组，在原数组反转（不能使用arr.reverse方法）
const reverse = (arr) => {
    const len = arr.length;
    for (let i = 0; i < Math.floor(len / 2); i++) {
        const temp = arr[i];
        arr[i] =  arr[len - i - 1];
        arr[len - i - 1] = temp; 
    }
    return arr;
}

reverse([1, 2, 3])
reverse([1])
reverse([1, 2])
