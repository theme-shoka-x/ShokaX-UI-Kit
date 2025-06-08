/* v8 ignore next 100 */

import { formatCategories } from './posts/formatCategories'
import { generateTagCloud } from './posts/generateTagCloud'
import { structurePostsByDate } from './posts/structurePostsByDate'
import { fmtNum } from './tools/fmtNum'
import { generateRandomBrightColor } from './tools/generateRandomBrightColor'

export default {
  formatCategories,
  structurePostsByDate,
  generateTagCloud,
  generateRandomBrightColor,
  fmtNum,
}
