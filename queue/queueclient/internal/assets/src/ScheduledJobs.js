import React from 'react';
import PageList from './PageList';
import UnixTime from './UnixTime';
import styles from './bootstrap.min.css';
import cx from './cx';
import { request } from './Request'

export default class ScheduledJobs extends React.Component {
  static propTypes = {
    url: React.PropTypes.string,
  }

  state = {
    page: 1,
    count: 0,
    jobs: []
  }

  fetch() {
    if (!this.props.url) {
      return;
    }
    request(`${this.props.url}?page=${this.state.page}`, 'GET').
      then((resp) => resp.json()).
      then((data) => {
        this.setState({
          count: data.count,
          jobs: data.jobs
        });
      });
  }

  componentWillMount() {
    this.fetch();
  }

  updatePage(page) {
    this.setState({page: page}, this.fetch);
  }

  render() {
    return (
      <div className={cx(styles.panel, styles.panelDefault)}>
        <div className={styles.panelHeading}>Scheduled Jobs</div>
        <div className={styles.panelBody}>
          <p>{this.state.count} job(s) scheduled.</p>
          <PageList page={this.state.page} totalCount={this.state.count} perPage={20} jumpTo={(page) => () => this.updatePage(page)}/>
        </div>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Arguments</th>
                <th>Scheduled For</th>
              </tr>
              {
                this.state.jobs.map((job) => {
                  return (
                    <tr key={job.id}>
                      <td>{job.name}</td>
                      <td>{JSON.stringify(job.args)}</td>
                      <td><UnixTime ts={job.t} /></td>
                    </tr>
                    );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
