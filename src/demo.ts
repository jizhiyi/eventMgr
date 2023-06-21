import { EventType, IEventDataDemo } from "./EventEnum";
import EventMgr from "./EventMgr";

const eventMgr: EventMgr = new EventMgr();

/**
 * 简单的模拟一个组件类
 */
class TestDemo {
    /** 可以认为是生命周期里的初始化 */
    start() {
        eventMgr.Register(EventType.EventType_Demo, this.handleEvent, this);
        // 会有类型不兼容的警告
        // eventMgr.Register(EventType.EventType_Demo, this.handleEvent1, this); 
    }

    /** 可以认为是生命周期里的销毁 */
    destroy() {
        eventMgr.UnReigster(EventType.EventType_Demo, this.handleEvent, this);
    }

    handleEvent (e: IEventDataDemo) {
        console.log(e.data1, e.data2);
    }

    handleEvent1 (e:{data:number}) {

    }
}

let testDemo = new TestDemo();
testDemo.start();

eventMgr.DispathEvent(EventType.EventType_Demo, {
    data1: "first string Data",
    data2: 12,
});

testDemo.destroy();

eventMgr.DispathEvent(EventType.EventType_Demo, {
    data1: "second string Data",
    data2: 12,
});
