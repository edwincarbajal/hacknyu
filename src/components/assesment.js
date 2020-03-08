import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import {Grid, Header, Segment } from 'semantic-ui-react'

export default ({ stats }) => (
    <Grid padded="vertically">
      <Header style={{ paddingTop: '25px' }} as="h3">Risk Assessment</Header>
        <Segment>
            <CircularProgressbar
            value={stats.slice(0, stats.length - 1)} text={`${stats}`}
            styles={buildStyles({
              backgroundColor: '#0FC7A7',
              pathColor: `rgba(62, 152, 199, ${stats.slice(0, stats.length - 1) / 100})`
            })}
          />
        </Segment>
    </Grid>
)
