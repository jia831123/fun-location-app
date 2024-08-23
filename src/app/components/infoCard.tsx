import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Data } from '../service/api/searchShowAction'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Alert, CardHeader, CardMedia, IconButton } from '@mui/material'
import { Diversity1 } from '@mui/icons-material'

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

    return (
      <Card
        ref={divRef}
        className={`fixed bottom-0 w-full max-w-[430px] bg-white shadow-md overflow-auto transition-transform duration-500 ${
          isVisible ? 'transform translate-y-0' : 'transform translate-y-full'
        } overflow-auto  ${className}`}
        sx={{ minWidth: 275 }}
      >
        <CardContent>
          <div className="p-0 flex justify-end">
            <IconButton onClick={onClose} aria-label="settings">
              <HighlightOffIcon />
            </IconButton>
          </div>
          <Typography variant="h5" component="div" gutterBottom>
            {data?.title}
          </Typography>
          {data?.descriptionFilterHtml && (
            <Alert variant="outlined" severity="info">
              <div
                dangerouslySetInnerHTML={{
                  __html: String(data?.descriptionFilterHtml || ''),
                }}
              />
            </Alert>
          )}

          {data?.imageUrl && (
            <CardMedia
              component="img"
              height="194"
              image={data?.imageUrl}
              alt="Paella dish"
            />
          )}
          <Typography variant="body2">
            <Alert severity="success">起始日:{data?.startDate}</Alert>
          </Typography>
          <Typography variant="body2">
            <Alert severity="warning">結束日:{data?.endDate}</Alert>
          </Typography>
          <Typography variant="body2">
            <Alert severity="info">
              展覽地點:{data?.showInfo[0]?.locationName} -{' '}
              {data?.showInfo[0]?.location}
            </Alert>
          </Typography>
          <Typography variant="body2">
            <Alert severity="error">
              票價: {data?.showInfo[0]?.price || '暫時無資訊'}
            </Alert>
          </Typography>
          <Typography variant="body2">
            {data?.webSales ? (
              <Button>
                <Link
                  href={data?.webSales}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  更多信息和購票
                </Link>
              </Button>
            ) : null}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className="w-full"
            variant="contained"
            onClick={onClose}
            size="large"
          >
            知道了
          </Button>
        </CardActions>
      </Card>
    )
  }
)
InfoCard.displayName = 'InfoCard'
export default InfoCard
