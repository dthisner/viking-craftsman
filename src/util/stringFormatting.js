import _ from 'lodash'
import dateformat from 'dateformat'

export const previewText = (data, letters) => {
  var content = data.replace(/<[^>]+>/g, '')

  return _.trim(content.substr(0, letters)) + '...'
}

export const formatDate = (d) => {
  return dateformat(d, 'dS mmmm yyyy').toString()
}
