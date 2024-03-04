import { cssVar, defineStyle, defineStyleConfig, extendTheme } from '@chakra-ui/react'
import { colors } from './colors'

const $startColor = cssVar('skeleton-start-color')
const $endColor = cssVar('skeleton-end-color')

const brand = defineStyle({
  _light: {
    [$startColor.variable]: colors.accent[100],
    [$endColor.variable]: colors.brand[100],
  },
})

const skeletonTheme = defineStyleConfig({
  variants: { brand },
  defaultProps: {
    variant: 'brand',
  },
})

export const theme = extendTheme({
  colors,
  components: {
    Skeleton: skeletonTheme,
  },
})
