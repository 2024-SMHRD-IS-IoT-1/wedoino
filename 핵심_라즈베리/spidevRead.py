import spidev


spi = spidev.SpiDev() # spidev 객체를 호출, spi변수에 할당

spi.open(0,0) # spi 통신시작

spi.max_speed_hz = 1000000 #spi통신의 속도


def analog_read(portChanner):
    adc = spi.xfer2([1, (8+portChanner)<<4, 0])
    data = ((adc[1]&3)<<8)+adc[2]
    return data