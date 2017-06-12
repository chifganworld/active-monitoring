import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { push } from 'react-router-redux'
import DataTable from 'react-md/lib/DataTables/DataTable'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'

import * as collectionActions from '../../actions/campaigns'
import * as itemActions from '../../actions/campaign'
import EmptyListing from '../EmptyListing'
import Subheader from '../Subheader'

class CampaignsList extends Component {
  render() {
    const campaigns = this.props.items || []

    if (campaigns.length == 0) {
      return (
        <EmptyListing image='/images/campaign.svg'>
          You have no campaigns yet
          <NavLink to='#' onClick={this.props.createCampaign}>Create one</NavLink>
        </EmptyListing>
      )
    }

    return (
      <DataTable plain className='app-listing'>
        <TableHeader>
          <TableRow>
            <TableColumn>Name</TableColumn>
            <TableColumn>Role</TableColumn>
            <TableColumn>Last Activity</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          { campaigns.map(c => <CampaignItem key={c.id} campaign={c} onClick={this.props.onCampaignClick} />) }
        </TableBody>
      </DataTable>
    )
  }
}

CampaignsList.propTypes = {
  createCampaign: PropTypes.func.isRequired,
  onCampaignClick: PropTypes.func.isRequired,
  items: PropTypes.array
}

class CampaignItem extends Component {
  render() {
    const campaign = this.props.campaign
    return (
      <TableRow onClick={() => this.props.onClick(campaign.id)}>
        <TableColumn>{campaign.name}</TableColumn>
        <TableColumn>...</TableColumn>
        <TableColumn>...</TableColumn>
      </TableRow>
    )
  }
}

CampaignItem.propTypes = {
  campaign: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

class Campaigns extends Component {
  componentWillMount() {
    this.props.collectionActions.fetchCampaigns()
  }

  createCampaign() {
    this.props.itemActions.createCampaign({name: ''})
  }

  goToCampaign(id) {
    this.props.navigate(`/campaigns/${id}`)
  }

  render() {
    return (
      <div>
        <Subheader addButtonHandler={() => this.createCampaign()}>
          Campaigns
        </Subheader>
        <CampaignsList
          items={this.props.campaigns.items}
          createCampaign={() => this.createCampaign()}
          onCampaignClick={(id) => this.goToCampaign(id)} />
      </div>
    )
  }
}

Campaigns.propTypes = {
  collectionActions: PropTypes.object.isRequired,
  itemActions: PropTypes.object.isRequired,
  campaigns: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  campaigns: state.campaigns
})

const mapDispatchToProps = (dispatch) => ({
  collectionActions: bindActionCreators(collectionActions, dispatch),
  itemActions: bindActionCreators(itemActions, dispatch),
  navigate: (path) => dispatch(push(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(Campaigns)