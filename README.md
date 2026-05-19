# VendiMap

旅先・外出先で、近くの自動販売機をサッと探せる無料の地図PWAです。

**公開URL**: https://mozonnnm.github.io/vending-finder/

## 特徴

- 🗺 **地図ベース**: 現在地から近くの自販機をピンで表示
- 🥤 **種類フィルター**: ドリンク・コーヒー・お菓子・食品・タバコ・駐車券などジャンル別に絞り込み
- 📍 **検索範囲切替**: 500m / 1km / 2km
- ⭐ **お気に入り**: よく使う自販機を保存
- 🧭 **コンパス**: スマホの向きに合わせた方向表示
- 🌗 **テーマ**: ライト / ダーク / 自動切替
- 📱 **PWA**: アプリストア経由不要、ホーム画面に追加可能
- 💾 **オフライン対応**: Service Worker による App Shell キャッシュ
- 🔄 **状態の永続化**: 最後の地図位置・ズーム・フィルターを記憶
- ⚡ **APIキャッシュ**: Overpass APIへの負荷を抑制（1時間TTL）
- ⚠️ **古いデータ判定**: OSMで8年以上更新がないピンには注意マークを表示

## 技術スタック

- **HTML / CSS / JavaScript**（ビルドツールなし、単一の `index.html`）
- **[Leaflet 1.9.4](https://leafletjs.com/)** — 地図描画ライブラリ
- **[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) 1.5.3** — ピンのクラスタリング
- **[OpenStreetMap](https://www.openstreetmap.org/) / [Overpass API](https://overpass-api.de/)** — 自販機のデータソース（`amenity=vending_machine`）
- **[MapTiler](https://www.maptiler.com/)** — 地図タイル配信
- **Service Worker** — PWA / オフライン対応

## ローカル開発

クローンしてHTTPサーバーを立てれば動きます。Service Worker / 位置情報のために `file://` ではなくHTTPで配信してください。

```bash
git clone https://github.com/mozonnnm/vending-finder.git
cd vending-finder
python3 -m http.server 8765
# ブラウザで http://localhost:8765/ を開く
```

## デプロイ

GitHub Pages を使用しています。`main` ブランチへのプッシュで自動反映されます。

```bash
git push origin main
# 1-2分後に https://mozonnnm.github.io/vending-finder/ に反映
```

別のホスティング（Cloudflare Pages / Vercel / Netlify など）でも、リポジトリのルートを公開するだけで動きます。

## クレジット

- 自販機データは [OpenStreetMap](https://www.openstreetmap.org/) コントリビューターによる © OpenStreetMap contributors
- データ取得は [Overpass API](https://overpass-api.de/) を利用
- 地図タイルは [MapTiler](https://www.maptiler.com/) を利用

## 既知の制限

- 自販機データの精度はOpenStreetMapに依存します。観光地でも網羅性は地域差があります
- Overpass APIは公共インフラのため、レート制限がかかる場合があります（本アプリ側で1時間のローカルキャッシュ＋2秒クールダウンを実装済み）
- 8年以上更新がないデータは⚠️マークで表示しますが、実在性は保証されません

## ポリシー

- [プライバシーポリシー](https://mozonnnm.github.io/vending-finder/privacy.html)
- [利用規約](https://mozonnnm.github.io/vending-finder/terms.html)

## ライセンス

未設定。コードを再利用したい場合はissueにてご相談ください。
