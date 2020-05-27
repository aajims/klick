import * as mutation from '../../mutation-types'

export default {
    [mutation.SET_DASHBOARD_LIST](state, payload) {
        state.dashData = payload.dataList
    },
    [mutation.SET_DASHBOARD_GRAFIK](state, payload) {
        // //console.log(payload.grafik)
        state.pieDash = {
            data: payload.piechart.map(Object.values).reduce((a, b) => {
                return a.concat(b)
            }),
            label: payload.piechart.map(Object.keys).reduce((a, b) => {
                return a.concat(b)
            }),
        };

        let label, data;
        if (payload.grafik.order !== undefined) {
            label = payload.grafik.order.labels;

            data = [payload.grafik.order.series];
            state.grafikDash = {
                label,
                data
            }
        }
        if (payload.grafik.task !== undefined) {
            label = payload.grafik.task.labels;

            data = [payload.grafik.task.series];
            state.grafikDash = {
                label,
                data
            }
        }
        if (payload.grafik.task !== undefined && payload.grafik.order !== undefined) {

            label = payload.grafik.order.labels.concat(payload.grafik.task.labels.filter((item) => {
                return payload.grafik.order.labels.indexOf(item) < 0;
            }));

            data = [payload.grafik.order.series, payload.grafik.task.series];
            state.grafikDash = {
                label,
                data
            }
        }
    },
    [mutation.SET_CLEAR_GRAFIK](state) {
        state.pieDash = null;
        state.grafikDash = null
    },
}