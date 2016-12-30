import React, { Component } from 'react';
import Timer from '../components/Timer';
import CreateTimer from '../components/CreateTimer';

export default class TimersList extends Component {
  createTimerElement(timer) {
    const project = this.props.projects.get(timer.get('project-id'));
    if (!project) {
      return null;
    }

    return (
      <li key={timer.get('id')}>
        <ul>
          <li>
            Project: {project.get('name')}
          </li>
          <li>
            <Timer startedEpoch={timer.get('started-time')}
                        duration={timer.get('duration')}
                        onTimerToggle={() => this.props.onTimerToggle(timer)}
                        onTimerEdit={(duration) => this.props.onTimerEdit(timer, duration)}
              />
          </li>
        </ul>
      </li>
    );
  }

  render() {
    const timerElements = this.props.timers
                            .valueSeq()
                            .sortBy(timer => timer.get('time-created'))
                            .map((timer) => this.createTimerElement(timer));
    const projectsList = this.props.projects.valueSeq();
    return (
      <ul>
        {timerElements}
        <li>
          <CreateTimer onClick={(projectId) => this.props.onCreateClick(projectId)}
                       projects={projectsList}/>
        </li>
      </ul>
    )
  }
}