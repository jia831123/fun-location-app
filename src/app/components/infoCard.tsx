import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import clsx from 'clsx' // 用於條件合併 class 名稱
import { Data } from '../service/api/searchShowAction'
import { forwardRef, useImperativeHandle, useRef } from 'react'

const InfoCard = forwardRef(
  (
    {
      isVisible,
      className = '',
      data,
      onClose,
    }: {
      isVisible: boolean
      className: string
      data?: Data | null
      onClose: () => void
    },
    ref
  ) => {
    const divRef = useRef<any>(null)

    useImperativeHandle(ref, () => ({
      scrollToTop() {
        if (divRef.current) {
          divRef.current.scrollTop = 0
        }
      },
    }))
    // const s = `
    //           title:  ${item.title}<br>,
    //           time: ${item.showInfo[0].time}<br>
    //           location: ${item.showInfo[0].location}<br>
    //           locationName: ${item.showInfo[0].locationName}<br>
    //           onSales: ${item.showInfo[0].onSales}<br>
    //           price: ${item.showInfo[0].price}<br>
    //           latitude?: ${item.showInfo[0].latitude}<br>
    //           longitude?: ${item.showInfo[0].longitude}<br>
    //           endTime: ${item.showInfo[0].endTime}`

    return (
      <Card
        className={`fixed bottom-0 left-0 w-full max-w-full bg-white shadow-md overflow-auto transition-transform duration-500 ${
          isVisible ? 'transform translate-y-0' : 'transform translate-y-full'
        } overflow-auto max-w-[430xp] ${className}`}
        sx={{ minWidth: 275 }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {data?.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <span
              dangerouslySetInnerHTML={{
                __html: String(data?.descriptionFilterHtml || ''),
              }}
            />
          </Typography>
          <Typography variant="body2">
            <strong>起始日</strong>
            <br />
            {data?.startDate}
          </Typography>
          <Typography variant="body2">
            <strong>結束日</strong>
            <br />
            {data?.endDate}
          </Typography>
          <Typography variant="body2">
            <strong>展覽地點</strong>
            <br />
            {data?.showInfo[0]?.locationName} - {data?.showInfo[0]?.location}
          </Typography>
          <Typography variant="body2">
            <strong>票價</strong>
            <br />
            {data?.showInfo[0]?.price || '暫時無資訊'}
          </Typography>
          <Typography variant="body2">
            {data?.webSales ? (
              <Link
                href={data?.webSales}
                target="_blank"
                rel="noopener noreferrer"
              >
                更多信息和購票
              </Link>
            ) : null}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={onClose} size="small">
            知道了
          </Button>
        </CardActions>
      </Card>
    )
  }
)
InfoCard.displayName = 'InfoCard'
export default InfoCard
