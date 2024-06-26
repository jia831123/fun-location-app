import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
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
        ref={divRef}
        className={clsx(
          `fixed bottom-0 left-0 w-full max-w-full bg-white shadow-md overflow-auto transition-transform duration-500 ${
            isVisible ? 'transform translate-y-0' : 'transform translate-y-full'
          } overflow-auto max-w-[430px]`,
          className
        )}
        sx={{ minWidth: 275 }}
      >
        <CardContent className="p-6">
          <Typography variant="h5" component="div">
            {data?.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <span
              dangerouslySetInnerHTML={{
                __html: String(data?.descriptionFilterHtml || ''),
              }}
            ></span>
          </Typography>
          <Typography variant="body2">
            起始日
            <br />
            {data?.startDate}
          </Typography>
          <Typography variant="body2">
            結束日
            <br />
            {data?.endDate}
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
