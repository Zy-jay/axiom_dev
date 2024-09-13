import { PureComponent, useReducer } from "react";
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';


export default class PortfolioChart extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        };
        this.data = props.data;
    }


    onPieEnter = (_, index) => {
        this.setState({
            activeIndex: index,
        });
    };


    render() {

        const data = this.props.data;
        console.debug("data", data)
        return (
            <ResponsiveContainer style={{
                backgroundImage: `url(${this.props.daoLogo})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "30%",
                backgroundPosition: "center"
            }} key={`rc_${data.length}`} data={data} width={"100%"} height={"100%"}  >
                <PieChart
                    data={data}
                    key={`pie_chart_${data.length}`}
                    // width={600} height={600}
                    onMouseEnter={null}
                >
                    <Pie
                        data={data}
                        // cx={120}
                        // cy={230}

                        innerRadius={"85%"}
                        outerRadius={"95%"}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        cursor={"pointer"}
                        key={`pie_${data.length}`}
                    >

                        {data.map((entry, index) => (
                            <Cell key={`portfolio-${index}-${entry.name}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}
