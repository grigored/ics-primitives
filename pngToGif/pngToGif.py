import imageio

GIF_FRAME_DELAY = 1  # seconds

def create_gif(file_names, output_file_name):
    images = []
    for filename in file_names:
        images.append(imageio.imread(filename))
    imageio.mimsave('./{}.gif'.format(output_file_name), images, duration=GIF_FRAME_DELAY)


if __name__ == '__main__':
    create_gif(
        ['dummy_image1.png', 'dummy_image2.png', 'dummy_image3.png', 'dummy_image4.png'],
        'outputGif'
    )