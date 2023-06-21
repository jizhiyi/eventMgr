import { EventType, IEventModel } from "./EventEnum";

interface IItem {
    cb: Function;
    ctx: unknown;
}

export default class EventMgr {
    private map: Map<EventType, Array<IItem>> = new Map();

    Register<T extends keyof IEventModel>(
        iEventType: T,
        cb: (arg: IEventModel[T]) => void,
        ctx: unknown
    ) {
        if (this.map.has(iEventType)) {
            this.map.get(iEventType)?.push({ cb, ctx });
        } else {
            this.map.set(iEventType, [{ cb, ctx }]);
        }
    }

    UnReigster<T extends keyof IEventModel>(
        iEventType: T,
        cb: (arg: IEventModel[T]) => void,
        ctx: unknown
    ) {
        if (this.map.has(iEventType)) {
            const idx = (this.map.get(iEventType) as IItem[]).findIndex(
                (item) => cb === item.cb && item.ctx === ctx
            );
            idx > -1 && this.map.get(iEventType)?.splice(idx, 1);
        }
    }

    DispathEvent<T extends keyof IEventModel>(
        iEventType: T,
        arg: IEventModel[T]
    ) {
        if (this.map.has(iEventType)) {
            this.map.get(iEventType)?.forEach(({ cb, ctx }) => {
                cb.call(ctx, arg);
            });
        }
    }
}
