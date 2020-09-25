export class MoneyStatistic {
    total: number;
    count: number;
    _id: string;
}

export class DishStatistic {
    count: number;
    total_plate: number;
    name: string;
    date: string;
}

export class CustomerStatistic {
    _id: string;
    count_bill: number;
    total_money: number;
}
export class StaffStatistic {
    _id: string;
    count_bill: number;
    total_money: number;
}

export interface NewUpdateModel {
    user_new: {
        length: number;
        data: [];
    };
    post_new: {
        length: number;
        data: []
    };
    invoice_new: {
        length: number;
        data: [];
    };
    dish_new: {
        length: number;
        data: [];
    };
}

export interface ServerUsage {
    cpu: {
        usage: number;
        free: number;
        count: number;
    };
    drive: {
        totalGb: number;
        usedGb: number;
        freeGb: number;
        usedPercentage: number;
        freePercentage: number;
    };
    memory: {
        totalMemMb: number;
        usedMemMb: number;
        freeMemMb: number;
        freeMemPercentage: number;
    };
    os: {
        oos: string;
        platform: string;
        hostname: string;
    };
}
