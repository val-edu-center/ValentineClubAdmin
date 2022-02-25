import React from "react"
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const GameNightPieChart = ({ title, votes }) => {
    console.log({title, votes})
    const voteMap = votes.reduce(function(map, vote) {
        const existingVotes = map[vote.get("option")]
        if (existingVotes) {
            existingVotes.push(vote.get("username"))
            map[vote.get("option")] = existingVotes
        } else {
            map[vote.get("option")] = [vote.get("username")]
        }
        return map
    }, {})
    const data = []
    const total = votes.length
    for (var key in voteMap){
        const gameNightVotes = voteMap[key]
        const y = gameNightVotes.length/total
        data.push({name: key,  y})
    } 
    const options = getOptions(title, votes, data)
    return <div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </div>
}

const getOptions = (title, votes, data) => {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: data
        }]
    }
}

export default GameNightPieChart