import { defineComponent, createElement as h } from "@vue/composition-api";

export default defineComponent({
    name: "TestComponent",
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    setup: (props) => {
        return () =>
        {
            return (
                <div>{props.title}</div>
            )
        }
    }
})