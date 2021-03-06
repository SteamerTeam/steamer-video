'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./index.less');

var _playbackControl = require('./playback-control');

var _playbackControl2 = _interopRequireDefault(_playbackControl);

var _videoPlayer = require('./video-player');

var _videoPlayer2 = _interopRequireDefault(_videoPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Video = function (_Component) {
	_inherits(Video, _Component);

	function Video(props, context) {
		_classCallCheck(this, Video);

		var _this = _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).call(this, props, context));

		_this.state = {
			hasPlayed: false // 是否已经播放过	
		};

		_this.setHasPlayed = _this.setHasPlayed.bind(_this);
		return _this;
	}

	_createClass(Video, [{
		key: 'componentWillMount',
		value: function componentWillMount() {}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}, {
		key: 'setHasPlayed',
		value: function setHasPlayed() {
			this.setState({
				hasPlayed: true
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var videoData = this.props.videoData;


			var windowScrollTop = window.document.body.scrollTop || window.document.documentElement.scrollTop;
			windowScrollTop += 80;

			var style = {
				display: "block",
				height: window.document.body.scrollHeight + "px",
				width: window.document.body.clientWidth + "px"
			};

			var v = videoData.list[0] || {},
			    pic = v.pic_url || "";
			pic = pic.replace("http:", "").replace("https:", "");

			var videoFrameStyle = {
				backgroundImage: "url(" + pic + ")"
			};

			return _react2.default.createElement(
				'div',
				{
					className: 'steamer-video-wrapper',
					style: style,
					onTouchMove: function onTouchMove(e) {
						e.preventDefault();
					}
				},
				_react2.default.createElement(
					'div',
					{
						className: 'steamer-video-player'
					},
					_react2.default.createElement(
						'div',
						{ className: 'steamer-video-frame', style: videoFrameStyle },
						_react2.default.createElement(
							'div',
							{ id: 'steamer-video-list', className: this.state.hasPlayed ? "" : "none" },
							_react2.default.createElement(_videoPlayer2.default, {
								className: 'steamer-video-frame',
								type: "video/mp4",
								autoplay: false,
								preload: true,
								poster: require("./img/black-bg.png")
							})
						),
						videoData.list[0].url ? _react2.default.createElement(_playbackControl2.default, {
							videoData: videoData,
							videoIdName: "steamer-video-list",
							setHasPlayed: this.setHasPlayed
						}) : null
					)
				)
			);
		}
	}]);

	return Video;
}(_react.Component);

exports.default = Video;